package model;

import com.Servify.model.*;
import org.junit.Assert;
import org.junit.Test;

public class ServiceTest {

    @Test
    public void Test2ServicesHasTheSameCategory() {
        CategoryService mcat = CategoryManager.getCategory("Plomeria");
        ServiceServify serv = new ServiceServify(mcat);

        Assert.assertTrue(serv.sameCategory(serv));
    }
    @Test
    public void AddAnAnswerToAQuestionInTheService() {
        CategoryService mcat = CategoryManager.getCategory("Plomeria");
        ServiceServify serv = new ServiceServify(mcat);
        try {
            ServiceQuestion sq = new ServiceQuestion("tene palta", "pepe","pepemail");
            serv.addQuestion(sq);
            serv.addResponseToQuestion("se","tene palta");
        } catch (InvalidQuestion invalidQuestion) {
        }
        Assert.assertEquals(serv.getQuestions().get(0).getAnswer(),"se");
    }

    @Test
    public void AddAnAnswerToANonExistentQuestionInTheService() {
        CategoryService mcat = CategoryManager.getCategory("Plomeria");
        ServiceServify serv = new ServiceServify(mcat);
        try {
            ServiceQuestion sq = new ServiceQuestion("tene palta", "pepe","pepemail");
            serv.addQuestion(sq);
            serv.addResponseToQuestion("se","tene palta2");
        } catch (InvalidQuestion invalidQuestion) {

        Assert.assertEquals("El servicio Plomeria no tiene la pregunta tene palta2",invalidQuestion.getMessage());
        }
    }

    @Test
    public void add2ImagesWithTheSameNameAndType(){
        CategoryService mcat = CategoryManager.getCategory("Plomeria");
        ServiceServify serv = new ServiceServify(mcat);
        try {
            serv.addImage(new ServifyImage("name", "png", new byte[]{(byte) 0xe0}));
            serv.addImage(new ServifyImage("name", "png", new byte[]{(byte) 0xe0}));
        }
        catch (ServiceProviderError e){
            Assert.assertEquals("Error : no pueden haber 2 imagenes con el mismo nombre y tipo", e.getMessage());
        }
    }

    @Test
    public void removingANonExistentImage(){
        CategoryService mcat = CategoryManager.getCategory("Plomeria");
        ServiceServify serv = new ServiceServify(mcat);
        serv.addImage(new ServifyImage("name","png",new byte[] { (byte)0xe0}));
        serv.addImage(new ServifyImage("papa","jpg",new byte[] { (byte)0xe0}));
        Assert.assertEquals(2,serv.getImages().size());
        serv.removeImage("name","type");
        Assert.assertEquals(2,serv.getImages().size());
    }
    @Test
    public void removingAExistentImage(){
        CategoryService mcat = CategoryManager.getCategory("Plomeria");
        ServiceServify serv = new ServiceServify(mcat);
        serv.addImage(new ServifyImage("name","png",new byte[] { (byte)0xe0}));
        serv.addImage(new ServifyImage("papa","jpg",new byte[] { (byte)0xe0}));
        Assert.assertEquals(2,serv.getImages().size());
        serv.removeImage("name","png");
        Assert.assertEquals(1,serv.getImages().size());
    }
}
