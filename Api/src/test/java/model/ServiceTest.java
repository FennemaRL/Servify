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
}
