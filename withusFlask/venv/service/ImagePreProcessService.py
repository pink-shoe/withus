import cv2
import numpy as np
from random import randint

class ImagePreProcessService:
    def __init__(self):
        self.device = "cpu"
        self.protoFile = "./Include/model/pose/pose_deploy_linevec.prototxt"
        self.weightFile = "./Include/model/pose/pose_iter_440000.caffemodel"
        self.nPoint = 18
        self.keypointsMapping = ['Nose', 'Neck', 'R-Sho', 'R-Elb', 'R-Wr', 'L-Sho',
         'L-Elb', 'L-Wr', 'R-Hip', 'R-Knee', 'R-Ank', 'L-Hip',
         'L-Knee', 'L-Ank', 'R-Eye', 'L-Eye', 'R-Ear', 'L-Ear']
        self.POSE_PAIRS = [[1,2], [1,5], [2,3], [3,4], [5,6], [6,7], [1,0]]
        self.mapIdx = [[31,32], [39,40], [33,34], [35,36], [41,42], [43,44], [47,48]]
        self.black_color = [0, 0, 0]
        self.image_size = (28, 28)
        # DNN을 위해 사용할 net
        self.net = cv2.dnn.readNetFromCaffe(self.protoFile, self.weightFile)
        self.net.setPreferableBackend(cv2.dnn.DNN_TARGET_CPU)
        # 뽑아낼 관절
        self.interested_joints = [0, 1, 2, 3, 4, 5, 6, 7]

    def getKeypoints(self, probMap, threshold=0.1):
        mapSmooth = cv2.GaussianBlur(probMap,(3,3),0,0)
        mapMask = np.uint8(mapSmooth>threshold)
        keypoints = []
        #find the blobs
        contours, _ = cv2.findContours(mapMask, cv2.RETR_TREE, cv2.CHAIN_APPROX_SIMPLE)

        #for each blob find the maxima
        for cnt in contours:
            blobMask = np.zeros(mapMask.shape)
            blobMask = cv2.fillConvexPoly(blobMask, cnt, 1)
            maskedProbMap = mapSmooth * blobMask
            _, maxVal, _, maxLoc = cv2.minMaxLoc(maskedProbMap)
            keypoints.append(maxLoc + (probMap[maxLoc[1], maxLoc[0]],))

        return keypoints

    # Find valid connections between the different joints of a all persons present
    def getValidPairs(self, output, detected_keypoints, frame_width, frame_height):
        detected_keypoint = []
        valid_pairs = []
        invalid_pairs = []
        n_interp_samples = 10
        paf_score_th = 0.1
        conf_th = 0.7
        # loop for every POSE_PAIR
        for k in range(len(self.mapIdx)):
            # A->B constitute a limb
            pafA = output[0, self.mapIdx[k][0], :, :]
            pafB = output[0, self.mapIdx[k][1], :, :]
            pafA = cv2.resize(pafA, (frame_width, frame_height))
            pafB = cv2.resize(pafB, (frame_width, frame_height))

            # Find the keypoints for the first and second limb
            candA = detected_keypoints[self.POSE_PAIRS[k][0]]
            candB = detected_keypoints[self.POSE_PAIRS[k][1]]
            nA = len(candA)
            nB = len(candB)

            # If keypoints for the joint-pair is detected
            # check every joint in candt1 every joint in candB
            # Calculate the distance vector between the two joints
            # Find the PAF values at a set of interpolated points between the joints
            # Use the above formula to compute a score to mark the connection valid

            if( nA != 0 and nB != 0):
                valid_pair = np.zeros((0,3))
                for i in range(nA):
                    max_j=-1
                    maxScore = -1
                    found = 0
                    for j in range(nB):
                        # Find d_ij
                        d_ij = np.subtract(candB[j][:2], candA[i][:2])
                        norm = np.linalg.norm(d_ij)
                        if norm:
                            d_ij = d_ij / norm
                        else:
                            continue
                        # Find p(u)
                        interp_coord = list(zip(np.linspace(candA[i][0], candB[j][0], num=n_interp_samples),
                                                np.linspace(candA[i][1], candB[j][1], num=n_interp_samples)))
                        # Find L(p(u))
                        paf_interp = []
                        for k in range(len(interp_coord)):
                            paf_interp.append([pafA[int(round(interp_coord[k][1])), int(round(interp_coord[k][0]))],
                                               pafB[int(round(interp_coord[k][1])), int(round(interp_coord[k][0]))] ])
                        # Find E
                        paf_scores = np.dot(paf_interp, d_ij)
                        avg_paf_score = sum(paf_scores)/len(paf_scores)

                        # Check if the connection is valid
                        # If the fraction of interpolated vectors aligned with PAF is higher then threshold -> Valid Pair
                        if ( len(np.where(paf_scores > paf_score_th)[0]) / n_interp_samples ) > conf_th :
                            if avg_paf_score > maxScore:
                                max_j = j
                                maxScore = avg_paf_score
                                found = 1
                    # Append the connection to the list
                    if found:
                        valid_pair = np.append(valid_pair, [[candA[i][3], candB[max_j][3], maxScore]], axis=0)

                # Append the detected connections to the global list
                valid_pairs.append(valid_pair)
            else: # If no keypoints are detected
                print("No Connection : k = {}".format(k))
                invalid_pairs.append(k)
                valid_pairs.append([])
        return valid_pairs, invalid_pairs

    # This function creates a list of keypoints belonging to each person
    # For each detected valid pair, it assigns the joint(s) to a person
    def getPersonwiseKeypoints(self, keypoints_list, valid_pairs, invalid_pairs):
        # the last number in each row is the overall score
        personwiseKeypoints = -1 * np.ones((0, 19))

        for k in range(len(self.mapIdx)):
            if k not in invalid_pairs:
                partAs = valid_pairs[k][:,0]
                partBs = valid_pairs[k][:,1]
                indexA, indexB = np.array(self.POSE_PAIRS[k])

                for i in range(len(valid_pairs[k])):
                    found = 0
                    person_idx = -1
                    for j in range(len(personwiseKeypoints)):
                        if personwiseKeypoints[j][indexA] == partAs[i]:
                            person_idx = j
                            found = 1
                            break

                    if found:
                        personwiseKeypoints[person_idx][indexB] = partBs[i]
                        personwiseKeypoints[person_idx][-1] += keypoints_list[partBs[i].astype(int), 2] + valid_pairs[k][i][2]

                    # if find no partA in the subset, create a new subset
                    elif not found and k < 17:
                        row = -1 * np.ones(19)
                        row[indexA] = partAs[i]
                        row[indexB] = partBs[i]
                        # add the keypoint_scores for the two keypoints and the paf_score
                        row[-1] = sum(keypoints_list[valid_pairs[k][i,:2].astype(int), 2]) + valid_pairs[k][i][2]
                        personwiseKeypoints = np.vstack([personwiseKeypoints, row])
        return personwiseKeypoints

    def getPreProcess(self, image):
        inHeight = 368
        inWidth = int((inHeight/image.shape[0])*image.shape[0])
        inpBlob = cv2.dnn.blobFromImage(image, 1.0 / 255, (inWidth, inHeight),
                          (0, 0, 0), swapRB=False, crop=False)

        # self.prepareNet()
        self.net.setInput(inpBlob)
        # dnn 전파
        output = self.net.forward()
        detected_keypoints = []
        keypoints_list = np.zeros((0,3))
        keypoint_id = 0
        threshold = 0.1
        for part in self.interested_joints:
            probMap = output[0,part,:,:]
            probMap = cv2.resize(probMap, (image.shape[1], image.shape[0]))
            keypoints = self.getKeypoints(probMap, threshold)
            print("Keypoints - {} : {}".format(self.keypointsMapping[part], keypoints))
            keypoints_with_id = []
            for i in range(len(keypoints)):
                keypoints_with_id.append(keypoints[i] + (keypoint_id,))
                keypoints_list = np.vstack([keypoints_list, keypoints[i]])
                keypoint_id += 1
            detected_keypoints.append(keypoints_with_id)
        
        valid_pairs, invalid_pairs = self.getValidPairs(output, detected_keypoints, image.shape[1], image.shape[0])
        personwiseKeypoints = self.getPersonwiseKeypoints(keypoints_list, valid_pairs, invalid_pairs)
        # 사람마다 검출한 스켈레톤 이어주기
        multiperson_skeleton = np.ones((image.shape[0], image.shape[1], 3), dtype=np.uint8) * 255
        # multiperson_skeleton = image.copy()
        for i in range(len(self.POSE_PAIRS) - 1):
            for n in range(len(personwiseKeypoints)):
                index = personwiseKeypoints[n][np.array(self.POSE_PAIRS[i])]
                #print(personwiseKeypoints[n][0].astype(int))
                if -1 in index:
                    continue
                B = np.int32(keypoints_list[index.astype(int), 0])
                A = np.int32(keypoints_list[index.astype(int), 1])
                # dots.append([B[0], A[0]])
                
                cv2.line(multiperson_skeleton, (B[0], A[0]), (B[1], A[1]), self.black_color, 10, cv2.LINE_AA)
        edge_list = np.zeros((0, 3))

        # 1. 모든 게임 참가자 좌우 손목 (팔꿈치) numpy array에 저장
        for person in range(len(personwiseKeypoints)):
            right_wrist_index = personwiseKeypoints[person][4] if personwiseKeypoints[person][4] != -1 else personwiseKeypoints[person][3]
            left_wrist_index = personwiseKeypoints[person][7] if personwiseKeypoints[person][7] != -1 else personwiseKeypoints[person][6]
            edge_list = np.vstack([edge_list, np.int32(keypoints_list[right_wrist_index.astype(int)])])
            edge_list = np.vstack([edge_list, np.int32(keypoints_list[left_wrist_index.astype(int)])])

        # 2. 하나씩 탐색하면서 가장 가까운 점 찾기
        matched_index = set()
        for index in range(len(edge_list)):
            if index in matched_index:
                continue
            matched_index.add(index)
            
            min_dist = np.linalg.norm(np.array([image.shape[0], image.shape[1]]))
            min_index = -1
            for other_index in range(len(edge_list)):
                # 이미 연결한 손 or 같은 사람의 손 : pass
                if other_index in matched_index or index // 2 == other_index // 2:
                    continue
                cur_dist = np.linalg.norm(edge_list[index] - edge_list[other_index])
                # 3. 기준 점 + 가장 가까운 점 체크
                if cur_dist < min_dist:
                    min_index, min_dist = other_index, cur_dist

            if min_index == -1 :
                continue
            matched_index.add(min_index)
            
            toDots = np.int32(edge_list[index])
            fromDots = np.int32(edge_list[min_index])
            cv2.line(multiperson_skeleton, (toDots[0], toDots[1]), (fromDots[0], fromDots[1]), self.black_color, 10 , cv2.LINE_AA)
        multiperson_skeleton = cv2.resize(multiperson_skeleton, dsize=self.image_size, interpolation=cv2.INTER_AREA)
        return multiperson_skeleton