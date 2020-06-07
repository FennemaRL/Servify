package integration.cucumber;

import com.Servify.model.CategoryManager;
import com.Servify.model.CategoryService;
import io.cucumber.java.en.Given;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.When;

import java.util.List;

import static org.junit.Assert.assertFalse;

public class ServiceStepdef {
    private List<CategoryService> result;

    @Given("A consumer")
    public void a_consumer() {
    }

    @When("Ask for the list of categories")
    public void ask_for_the_list_of_categories() {
        result = CategoryManager.categories();
    }

    @Then("Get the list of categories")
    public void get_the_list_of_categories() {
        assertFalse(result.isEmpty());
    }
}
