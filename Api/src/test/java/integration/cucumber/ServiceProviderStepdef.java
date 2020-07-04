package integration.cucumber;

import com.Servify.model.*;
import com.Servify.model.EmptyDescriptionError;
import com.Servify.model.EmptyFieldReceivedError;
import com.Servify.model.InvalidScopeError;
import com.Servify.model.NoExistentCategoryError;
import io.cucumber.java.en.And;
import io.cucumber.java.en.Given;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.When;
import org.junit.Assert;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

public class ServiceProviderStepdef {
    private ServiceProviderServify sp;
    private Boolean errorWasThrown;
    private Boolean canLoginWith;

    @Given("A serviceProvider {string}")
    public void a_serviceProvider(String name) {
        sp = new ServiceProviderServify(name);
    }

    @When("I add the service {string}")
    public void i_add_the_service(String cat) {
        try {
            ServiceServify ser = CategoryManager.createService(cat);
            sp.addService(ser);
        } catch (ServiceProviderError | NoExistentCategoryError serviceProviderError) {
            serviceProviderError.printStackTrace();
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
        } catch (ServiceProviderError serviceProviderError) {
            Assert.assertEquals(errorMesage, serviceProviderError.getMessage());
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
        } catch (EmptyDescriptionError | ServiceProviderError error) {
            Assert.assertEquals(errorMsg, error.getMessage());
        }
    }

    @When("I modify personal information")
    public void i_modify_personal_information() throws EmptyFieldReceivedError {

        sp.setPersonalInformation("Pepe2", "1234567890", "0987654321", "www.pepeCarpinteria.com",
                "pepelandia");
    }

    @Then("That information is in Pepe's profile")
    public void that_information_is_in_Pepe_s_profile() {
        Assert.assertEquals("Pepe2", sp.getName());
        Assert.assertEquals("1234567890", sp.getPhoneNmbr());
        Assert.assertEquals("0987654321", sp.getCelNmbr());
        Assert.assertEquals("www.pepeCarpinteria.com", sp.getWebPage());
        Assert.assertEquals("pepelandia", sp.getResidence());
    }

    @When("I modify personal information leaving one empty field")
    public void i_modify_personal_information_leaving_one_empty_field() {
        try{
            sp.setPersonalInformation("Pepe2", "", "0987654321", "www.pepeCarpinteria.com",
                    "");
        } catch (EmptyFieldReceivedError error) {
            errorWasThrown = true;
        }
    }

    @Then("I don't add any information and i throw {string}")
    public void i_don_t_add_any_information_and_i_throw(String string) {
        Assert.assertTrue(errorWasThrown);
    }

    @When("I add the scope area {string} to the service {string}")
    public void i_add_the_scope_area_to_the_service(String scope, String category) {
        List areas = new ArrayList();
        ScopeService area = ScopeManager.getScope(scope);
        areas.add(area);
        sp.modifyServiceWithScope(CategoryManager.getCategory(category), areas);
    }
    @Then("The scope area {string} is in the service {string}")
    public void the_scope_area_is_in_the_service(String area, String category) {
        List<ScopeService> scopes = sp.getServiceScope(CategoryManager.getCategory(category));
        Assert.assertEquals(scopes.stream().filter(scopeService -> scopeService.getScope().equals(area)).collect(Collectors.toList()).get(0).getScope(), area);
    }

    @Given("A serviceProvider with user {string} and password {string}")
    public void aServiceProviderWithUserAndPassword(String user, String password) {
        sp = new ServiceProviderServify(user, password);
    }

    @When("I login with user {string} and password {string}")
    public void iLoginWithUserAndPassword(String user, String password) {
        canLoginWith = sp.canLoginWith(password);
    }

    @Then("I login")
    public void iLogin() {
        Assert.assertTrue(canLoginWith);
    }

    @Then("I do not log in")
    public void iDoNotLoggedIn() {
        Assert.assertFalse(canLoginWith);
    }

}
