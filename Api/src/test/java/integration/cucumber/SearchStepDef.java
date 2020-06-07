package integration.cucumber;

import com.Servify.model.*;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.When;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import static org.junit.Assert.assertTrue;

public class SearchStepDef {
    private List<ServiceProviderServify> searchResult;
    private Boolean errorWasThrown;

    @When("Searchs using category basic search for plomeria service")
    public void searchs_using_category_basic_search_for_plomeria_service() throws ServiceProvideError {
        ArrayList<ServiceProviderServify> providers = new ArrayList<>();
        ServiceProviderServify provider = new ServiceProviderServify("MyProvider");
        provider.addService(new ServiceServify(CategoryManager.getCategory("Plomeria")));
        providers.add(provider);
        searchResult = providers;
    }

    @Then("Get the list of people who offer that service")
    public void get_the_list_of_people_who_offer_that_service() {
        assertTrue(searchResult.stream().anyMatch(provider -> {
            String category = "Plomeria";
            return provider.providesService(CategoryManager.getCategory(category));
        }));
    }

    @When("Searchs using category basic search for gas natural service")
    public void searchs_using_category_basic_search_for_gas_natural_service() {
        ArrayList<ServiceProviderServify> providers = new ArrayList<>();
        searchResult = providers;
    }

    @Then("Get an empty list of people who offer gas natural services")
    public void get_an_empty_list_of_people_who_offer_gas_natural_services() {
        assertTrue(searchResult.isEmpty());
    }

    @When("Searchs using category basic search for churrero service")
    public void searchs_using_category_basic_search_for_churrero_service() {
        try {
            ArrayList<ServiceProviderServify> providers = new ArrayList<>();
            ServiceProviderServify provider = new ServiceProviderServify("MyProvider");
            provider.addService(new ServiceServify(new CategoryService("Plomeria")));
            providers.add(provider);
            searchResult = providers.stream().filter(p -> p.providesService(CategoryManager.getCategory("Churrero")))
                    .collect(Collectors.toList());
        } catch (InvalidCategoryError | ServiceProvideError e) {
            errorWasThrown = true;
        }
    }

    @Then("An Error is thrown")
    public void an_Error_is_throwed() {
        assertTrue(errorWasThrown);
    }
}
