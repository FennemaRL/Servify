package integration.cucumber;

import com.Servify.model.InvalidCategoryError;
import com.Servify.model.ServiceProviderServify;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.When;

import java.util.List;

import static org.junit.Assert.assertTrue;

public class SearchStepDef {
    private List<ServiceProviderServify> searchResult;
    private Boolean errorWasThrown;

    @When("Searchs using category basic search for plomeria service")
    public void searchs_using_category_basic_search_for_plomeria_service() {
        searchResult =;
    }

    @Then("Get the list of people who offer that service")
    public void get_the_list_of_people_who_offer_that_service() {
        assertTrue(searchResult.stream().allMatch(provider ->
                provider.offeredServices.stream.anyMatch(service -> service.category == "Plomeria")));
    }

    @When("Searchs using category basic search for gas natural service")
    public void searchs_using_category_basic_search_for_gas_natural_service() {
        searchResult = ;//el que se encarga de realizar las busquedas, no tengo claro quien sería
    }

    @Then("Get an empty list of people who offer gas natural services")
    public void get_an_empty_list_of_people_who_offer_gas_natural_services() {
        assertTrue(searchResult.isEmpty());
    }

    @When("Searchs using category basic search for churrero service")
    public void searchs_using_category_basic_search_for_churrero_service() {
        try {
            searchResult =;//el que se encarga de realizar las busquedas, no tengo claro quien sería
        }catch (InvalidCategoryError e){
            errorWasThrown = true;
        }
    }

    @Then("An Error is throwed")
    public void an_Error_is_throwed() {
        assertTrue(errorWasThrown);
    }
}
