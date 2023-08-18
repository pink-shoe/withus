# pytorch로 model build
import torch
from torch import nn
from torch.utils.data import TensorDataset, DataLoader
from PIL import Image
import cv2
import time

model_path = './Include/model/model.pt'
device=torch.device("cpu")

class Flatten(torch.nn.Module):
    def __init__(self):
        super(Flatten, self).__init__()

    def forward(self, x):
        return x.view(-1, 512)

def cnn_model():
    return torch.nn.Sequential(
        torch.nn.Conv2d(1, 16, (5, 5)),
        torch.nn.MaxPool2d(2),
        torch.nn.ReLU(),
        torch.nn.Dropout(),
        torch.nn.Conv2d(16, 32, (5, 5)),
        torch.nn.MaxPool2d(2),
        torch.nn.ReLU(),
        torch.nn.Dropout(),
        Flatten(),
        torch.nn.Linear(512, 256),
        torch.nn.ReLU(),
        torch.nn.Dropout(),
        torch.nn.Linear(256, 5),
    )

class Model :
    def __init__(self):
        self.withus_model = cnn_model()
        self.withus_model.load_state_dict(torch.load(model_path, map_location=device))
        self.withus_model.eval()
        self.shape_list = ["4star", "circle", "pacman", "square", "triangle"]
    def predict(self, image):
        image_tensor = torch.tensor(cv2.cvtColor(image, cv2.COLOR_BGR2GRAY), dtype=torch.float32)
        image_tensor = image_tensor.unsqueeze(0)  # Add batch dimension
        image_tensor = image_tensor.to(device)
        with torch.no_grad():
            pred = self.withus_model(image_tensor)
            _, pred_label = torch.max(pred.data, 1)
            answer = pred_label[0].item()
        return answer
    
    def getAnswer(self, image):
        t = time.time()
        result = self.predict(image)
        print("[Image prediction] inference time : ", time.time() - t)
        return result, self.shape_list[result]