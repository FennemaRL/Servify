package model;


import com.Servify.model.InvalidQuestion;
import com.Servify.model.ServiceQuestion;
import org.junit.Assert;
import org.junit.Test;

public class QuestionTest {
    @Test(expected = InvalidQuestion.class)
    public void CantNotCreateAQuestionWithoutAEmptyQuestion() throws InvalidQuestion {
        new ServiceQuestion("","PEPE","MAIL");
    }
    @Test
    public void addAnAnswerToTheQuestion()  {
        ServiceQuestion sp = null;
        try {
            sp = new ServiceQuestion("vende la vaca lola","PEPE","MAIL");
            sp.addAnswer("nope");
        } catch (InvalidQuestion invalidQuestion) {
        }
        Assert.assertEquals("nope",sp.getAnswer());
    }
    @Test
    public void addAnEmptyResponseToTheQuestion()  {
        ServiceQuestion sp = null;
        try {
            sp = new ServiceQuestion("vende la vaca lola","PEPE","MAIL");
            sp.addAnswer("");
        } catch (InvalidQuestion invalidQuestion) {
            Assert.assertEquals("la respuesta no puede estar vacia",invalidQuestion.getMessage());
        }


    }
}
