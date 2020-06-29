package integration.cucumber;

import com.Servify.model.*;
import com.Servify.model.InvalidCategoryError;
import io.cucumber.java.en.Given;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.When;
import org.junit.Assert;
import org.junit.Before;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import static org.junit.Assert.assertTrue;

public class SearchStepDef {
    private List<ServiceProviderServify> searchResult;
    private Boolean errorWasThrown;
    ArrayList<ServiceProviderServify> providers;

    @Given("A provider list of servify application")
    public void a_provider_list_of_servify_application() {
        errorWasThrown = false;
        providers = new ArrayList<ServiceProviderServify>();

        ServiceProviderServify provider1 = new ServiceProviderServify("MyProvider1");
        ServiceServify service1 = new ServiceServify(CategoryManager.getCategory("Plomeria"));
        ArrayList<ScopeService> scope1 = new ArrayList<ScopeService>();
        scope1.add(ScopeManager.getScope("CABA"));
        service1.setScope(scope1);
        provider1.addService(service1);

        ServiceProviderServify provider2 = new ServiceProviderServify("MyProvider2");
        ServiceServify service2 = new ServiceServify(CategoryManager.getCategory("Plomeria"));
        ArrayList<ScopeService> scope2 = new ArrayList<ScopeService>();
        scope2.add(ScopeManager.getScope("GBA SUR"));
        service2.setScope(scope2);
        provider2.addService(service2);

        providers.add(provider1);
        providers.add(provider2);
    }

    @When("Searchs using category and zone search for {string} in {string}")
    public void searchs_using_category_and_zone_search_for_in(String category, String zone) {
        try{
            CategoryManager.getCategory(category);
            if(category.isEmpty()){throw new InvalidCategoryError("Invalid Category");}
            List<ServiceProviderServify> partialResult = providers.stream().filter(provider -> provider.hasServicesWithCategory(category)).collect(Collectors.toList());
            if(!zone.isEmpty()){
                searchResult = partialResult.stream().filter(provider -> provider.hasServicesWithCategoryAndZone(category, zone)).collect(Collectors.toList());
            }else{
                searchResult = partialResult;
            }
        }catch(InvalidCategoryError | ServiceProviderError e){
            errorWasThrown = true;
        }
    }

    @Then("Get the list of people who offer {string} in {string}")
    public void get_the_list_of_people_who_offer_in(String category, String scope) {
        if(scope.isEmpty()){
            assertTrue(searchResult.stream().allMatch(provider -> provider.hasServicesWithCategory(category)));
        }else{
            assertTrue(searchResult.stream().allMatch(provider ->
                    provider.hasServicesWithCategoryAndZone(category,scope)));
        }
    }

    @Then("Get an empty list of people who offer {string} in {string}")
    public void get_an_empty_list_of_people_who_offer_in(String category, String scope) {
        assertTrue(searchResult.isEmpty());
    }

    @Then("An Error is thrown")
    public void an_Error_is_thrown() {
        Assert.assertTrue(errorWasThrown);
    }
}
