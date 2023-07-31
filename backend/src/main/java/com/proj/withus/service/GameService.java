package com.proj.withus.service;

import com.proj.withus.domain.GameResult;
import com.proj.withus.domain.Player;
import com.proj.withus.domain.Room;
import com.proj.withus.domain.Shape;
import com.proj.withus.domain.dto.CaptureDto;
import com.proj.withus.domain.dto.GameResultDto;
import com.proj.withus.domain.dto.TotalGameResultDto;

import java.util.List;

public interface GameService {

    public Room getRoomInfo(Long hostId);
    public List<Player> getPlayersInfo(Long roomId);
    public List<Shape> getShapeInfo(int round);
    public boolean sendCaptureInfo(CaptureDto captureDto);
    public boolean getGameResult();

    public List<TotalGameResultDto> getTotalGameResult(Long roomId);
}
