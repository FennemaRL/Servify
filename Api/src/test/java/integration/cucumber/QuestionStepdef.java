package integration.cucumber;

import com.Servify.model.*;
import io.cucumber.java.en.And;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.When;
import org.junit.Assert;

import java.util.ArrayList;
import java.util.stream.Collectors;

public class QuestionStepdef {
    private ArrayList<ServiceProviderServify> providers ;

    @And("A serviceProvider {string} with Service {string}")
    public void a_serviceProvider_with_Service(String providerName, String serviceName) throws EmptyFieldReceivedError {
        providers = new ArrayList<>() ;
        ServiceProviderServify p = new ServiceProviderServify(providerName,"11","22","oo","pp", "pass");
        p.addService(CategoryManager.createService(serviceName));
        providers.add(p);
    }


    @When("I send the question {string}, with consumerName {string}, and mail  {string}  to  {string} in the service {string}")
    public void i_send_the_question_with_consumerName_and_mail_to_in_the_service(String question, String name, String mail, String serviceprovidername, String serviceName) {
        ServiceQuestion sq= null;
        try {
            sq = new ServiceQuestion(question,name,mail);
            providers.get(0).addQuestionToService(CategoryManager.getCategory(serviceName), sq);
        } catch (InvalidQuestion invalidQuestion) {
        }
    }
    @Then("The provider {string} has a new question in the service {string}")
    public void the_provider_has_a_new_question_in_the_service(String providerName, String serviceName) {

        ServiceServify service = providers.get(0).getServices().stream().filter(serviceServify -> serviceServify.sameCategory(CategoryManager.getCategory(serviceName))).collect(Collectors.toList()).get(0);
        Assert.assertFalse(service.getQuestions().isEmpty());
    }


    @Then("The provider {string} don't have a new question in the service {string}")
    public void theProviderDonTHaveANewQuestionInTheService(String providerName, String serviceName) {
        ServiceServify service = providers.get(0).getServices().stream().filter(serviceServify -> serviceServify.sameCategory(CategoryManager.getCategory(serviceName))).collect(Collectors.toList()).get(0);
        Assert.assertTrue(service.getQuestions().isEmpty());
    }


    @Then("The provider {string} in the service {string} in the question {string} has the answer {string}")
    public void theProviderInTheServiceInTheQuestionHasTheAnswer(String provName, String serviceName, String question, String answer) {
        ServiceServify service = providers.get(0).getServices().stream().filter(serviceServify -> serviceServify.sameCategory(CategoryManager.getCategory(serviceName))).collect(Collectors.toList()).get(0);
        ServiceQuestion questionf = service.getQuestions().get(0);
        Assert.assertEquals(answer, questionf.getAnswer());

    }

    @When("I answer the question {string} in service {string} with {string}")
    public void iAnswerTheQuestionInServiceWith(String question, String serviceName, String response) {
        ServiceProviderServify provider = providers.get(0);
        try {
            provider.addAnswerToServiceInQuestion(response,CategoryManager.getCategory(serviceName),question);
        } catch (InvalidQuestion invalidQuestion) {
        }
    }

    @Then("I answer the question {string} in service {string} with {string} throw Error {string}")
    public void iAnswerTheQuestionInServiceWithThrowError(String question, String serviceName, String response, String errMesage) {
        ServiceProviderServify provider = providers.get(0);
        try {
            provider.addAnswerToServiceInQuestion(response,CategoryManager.getCategory(serviceName),question);
        } catch (InvalidQuestion invalidQuestion) {
            Assert.assertEquals(errMesage,invalidQuestion.getMessage());
        }
    }
}
