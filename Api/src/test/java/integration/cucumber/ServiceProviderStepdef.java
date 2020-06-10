package integration.cucumber;

import com.Servify.model.*;
import io.cucumber.java.en.And;
import io.cucumber.java.en.Given;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.When;
import org.junit.Assert;

public class ServiceProviderStepdef {
    private ServiceProviderServify sp;

    @Given("A serviceProvider {string}")
    public void a_serviceProvider(String name) {
        sp = new ServiceProviderServify(name);
    }

    @When("I add the service {string}")
    public void i_add_the_service(String cat) {
        try {
            ServiceServify ser = CategoryManager.createService(cat);
            sp.addService(ser);
        } catch (ServiceProvideError | NoExistentCategoryError serviceProvideError) {
            serviceProvideError.printStackTrace();
        }
    }

    @Then("I provide the service {string}")
    public void i_provide_the_service(String catcomp) {

        CategoryService cs = CategoryManager.getCategory(catcomp);

        Assert.assertTrue(sp.providesService(cs));
    }

    @Then("I add the service {string} and throw {string}")
    public void iAddTheServiceAndThrow(String cat, String errorMesage) {
        ServiceServify serv3;
        try {
            serv3 = CategoryManager.createService(cat);
            sp.addService(serv3);
        } catch (NoExistentCategoryError ignored) {
        } catch (ServiceProvideError serviceProvideError) {
            Assert.assertEquals(errorMesage, serviceProvideError.getMessage());
        }
    }

    @Then("I delete the service {string}")
    public void iDeleteTheService(String cat) {
        CategoryService sc = CategoryManager.getCategory(cat);
        sp.remove(sc);
    }

    @And("I add a description {string} to the service {string}")
    public void iAddADescriptionToTheService(String description, String c) {
        sp.setServiceWithDescription(CategoryManager.getCategory(c), description);
    }

    @Then("That description {string} is in the service {string}")
    public void thatDescriptionIsInTheService(String description, String c) {
        Assert.assertEquals(sp.getServiceDescription(CategoryManager.getCategory(c)), description);
    }

    @Then("I add a description {string} to the service {string} and throw {string}")
    public void iAddADescriptionToTheServiceAndThrow(String description, String category, String errorMsg) {
        try {
            sp.setServiceWithDescription(CategoryManager.getCategory(category), description);
        } catch (EmptyDescriptionError error) {
            Assert.assertEquals(errorMsg, error.getMessage());
        }
    }
}
