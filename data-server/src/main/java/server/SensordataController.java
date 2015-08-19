package server;

import java.util.List;

public interface SensordataController {
    public void saveOrUpdate(List<Sensordata> dataList);

    public List<Sensordata> get(List<Long> ids);
}
