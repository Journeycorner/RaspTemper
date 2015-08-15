package server;

import java.util.Date;

public class SensordataDto {


    private Date timestamp;

    private Double temperature;
    private Double humidity;

    public Date getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(Date timestamp) {
        this.timestamp = timestamp;
    }

    public Double getTemperature() {
        return temperature;
    }

    public void setTemperature(Double temperature) {
        this.temperature = temperature;
    }

    public Double getHumidity() {
        return humidity;
    }

    public void setHumidity(Double humidity) {
        this.humidity = humidity;
    }

    public Sensordata dtoToEntity() {
        Sensordata sensordata = new Sensordata();
        sensordata.setTemperature(this.temperature);
        sensordata.setTimestamp(this.timestamp);
        sensordata.setHumidity(this.humidity);

        return sensordata;
    }
}
