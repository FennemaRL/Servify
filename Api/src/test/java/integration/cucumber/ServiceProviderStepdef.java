package integration.cucumber;

import com.Servify.model.*;
import io.cucumber.java.en.Given;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.When;
import org.junit.Assert;

public class ServiceProviderStepdef {
    private ServiceProviderServify sp ;
    @Given("A serviceProvider {string}")
    public void a_serviceProvider(String name) {
        sp = new ServiceProviderServify(name);
    }

    @When("I add the service {string}")
    public void i_add_the_service(String cat) {
        try {
        ServiceL ser =  CategoryManager.createService(cat);
            sp.addService(ser);
        } catch (ServiceProvide serviceProvide) {
            serviceProvide.printStackTrace();
        } catch (NoExistentCategorieError noExistentCategorieError) {
            noExistentCategorieError.printStackTrace();
        }
    }

    @Then("I provide the service {string}")
    public void i_provide_the_service(String catcomp) {
        ServiceL ser2 = null;
        try {
            ser2 = CategoryManager.createService(catcomp);
        } catch (NoExistentCategorieError noExistentCategorieError) {
            noExistentCategorieError.printStackTrace();
        }
        Assert.assertTrue(sp.providesService(ser2));
    }

}
