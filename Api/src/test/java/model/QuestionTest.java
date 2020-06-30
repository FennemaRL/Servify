package model;


import com.Servify.model.InvalidQuestion;
import com.Servify.model.ServiceQuestion;
import org.junit.Test;

public class QuestionTest {
    @Test(expected = InvalidQuestion.class)
    public void CantNotCreateAQuestionWithoutAEmptyQuestion() throws InvalidQuestion {
        new ServiceQuestion("","PEPE","MAIL");
    }
}
