package model;

import com.Servify.model.ServifyImage;
import org.junit.Assert;
import org.junit.Test;

import java.awt.*;

public class ServifyImageTest {
    @Test
    public void ifNotPngOrJPGTrowERROR(){
        try{
            new ServifyImage("papa","",new byte[] { (byte)0xe0});
        } catch (Exception e) {
            Assert.assertEquals("Error : la imagen No puede de ser de otro tipo que png o jpg", e.getMessage());
        }
    }
}
