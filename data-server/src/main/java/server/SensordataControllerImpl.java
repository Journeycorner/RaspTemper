package server;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.util.CollectionUtils;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

@Controller
public class SensordataControllerImpl implements SensordataController {

    @Autowired
    SensordataRepository sensordataRepository;

    @Override
    public void saveOrUpdate(List<Sensordata> dataList) {
        sensordataRepository.save(dataList);
    }

    @Override
    public List<Sensordata> get(List<Long> ids) {
        Iterable<Sensordata> source = CollectionUtils.isEmpty(ids) ? sensordataRepository.findAll() : sensordataRepository.findAll(ids);
        List<Sensordata> result = new ArrayList<>();
        source.forEach(result::add);

        return result;
    }
}
