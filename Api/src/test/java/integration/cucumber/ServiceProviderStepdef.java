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
    private ArrayList<ServiceProviderServify> registredProviders;

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

    @Given("The list of users of servify")
    public void the_list_of_users_of_servify() {
        registredProviders = new ArrayList<ServiceProviderServify>();

        ServiceProviderServify lucas = new ServiceProviderServify("lucas");
        ServiceProviderServify nacho = new ServiceProviderServify("nacho");
        ServiceProviderServify ailin = new ServiceProviderServify("ailin");
        ServiceProviderServify fran = new ServiceProviderServify("fran");

        registredProviders.add(lucas);
        registredProviders.add(fran);
        registredProviders.add(nacho);
        registredProviders.add(ailin);
    }

    @When("A new user who wants to register with name {string} phoneNmbr {string} celNmbr {string} webPage {string} residence {string}")
    public void a_new_user_who_wants_to_register_with_name_phoneNmbr_celNmbr_webPage_residence(String name, String phoneNmbr, String celNmbr, String webPage, String residence) {
        try{
            if(registredProviders.stream().anyMatch(p -> p.getName().equals(name))){
                throw new NameAlreadyInUseError("The user name is already in use");
            }else{
                ServiceProviderServify provider = new ServiceProviderServify(name,phoneNmbr,celNmbr,webPage,residence);
                registredProviders.add(provider);
            }
        }catch(NameAlreadyInUseError | EmptyFieldReceivedError e){
            errorWasThrown = true;
        }
    }

    @Then("An error is thrown")
    public void an_error_is_thrown() {
        Assert.assertTrue(errorWasThrown);
    }

    @Then("A new account is created with name {string} phoneNmbr {string} celNmbr {string} webPage {string} residence {string}")
    public void a_new_account_is_created_with_name_phoneNmbr_celNmbr_webPage_residence(String name, String phoneNmbr, String celNmbr, String webPage, String residence) {
        Assert.assertEquals(5, registredProviders.size());
        Assert.assertTrue(registredProviders.stream().anyMatch(p -> p.getName().equals(name) && p.getPhoneNmbr().equals(phoneNmbr) &&
                p.getCelNmbr().equals(celNmbr) && p.getWebPage().equals(webPage) && p.getResidence().equals(residence)));
    }
}
