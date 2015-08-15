package server;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@org.springframework.web.bind.annotation.RestController
public class RestController {

    @Autowired
    private SensordataController sensordataController;

    @RequestMapping(value = "/update", method = RequestMethod.POST)
    public void updateData(@RequestBody List<SensordataDto> dataList) {
        List<Sensordata> entities = new ArrayList<>();
        dataList.stream().forEach((dto)-> {entities.add(dto.dtoToEntity());});
        sensordataController.saveOrUpdate(entities);
    }

    @RequestMapping(value = "/get", method = RequestMethod.GET)
    public List<Sensordata> get() {
        return sensordataController.get(null);
    }
}
