package com.proj.withus.service;

import com.proj.withus.domain.Player;
import com.proj.withus.domain.Room;
import com.proj.withus.domain.Shape;
import com.proj.withus.domain.dto.GetCaptureImageReq;
import com.proj.withus.domain.dto.GetTotalGameResultRes;

import java.util.List;

public interface GameService {

    public Room getRoomInfo(Long hostId);
    public List<Player> getPlayersInfo(Long roomId);
    public List<Shape> getShapeInfo(Room room);
//    public boolean sendCaptureInfo(GetCaptureImageReq captureDto);
//    public boolean getGameResult();
    public String getCaptureUrl(Long resultId);
    public void chooseMvp(Long roomId, Long votedPlayerId);
    public List<GetTotalGameResultRes> getTotalGameResult(Long roomId);
    public void saveCaptureUrl(Long roomId, int round, String imageUrl);
    public void saveShape(Shape shape);
}
