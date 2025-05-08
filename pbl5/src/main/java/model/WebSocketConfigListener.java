package model;

import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;
import javax.servlet.annotation.WebListener;

@WebListener
public class WebSocketConfigListener implements ServletContextListener {

    @Override
    public void contextInitialized(ServletContextEvent sce) {
        System.out.println("WebSocketConfigListener: Đang thiết lập kích thước bộ đệm WebSocket...");
        System.setProperty("org.apache.tomcat.websocket.textBufferSize", "1048576");
        System.setProperty("org.apache.tomcat.websocket.binaryBufferSize", "1048576");
        System.out.println("Kích thước bộ đệm WebSocket đã được cấu hình: textBufferSize=" + 
            System.getProperty("org.apache.tomcat.websocket.textBufferSize") + 
            ", binaryBufferSize=" + 
            System.getProperty("org.apache.tomcat.websocket.binaryBufferSize"));
    }

    @Override
    public void contextDestroyed(ServletContextEvent sce) {
        System.out.println("WebSocketConfigListener: Context đã bị hủy.");
    }
}