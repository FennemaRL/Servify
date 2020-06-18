package integration.cucumber;

import com.Servify.model.*;
import io.cucumber.java.en.Given;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.When;

import java.util.List;

import static org.junit.Assert.*;

public class ServiceStepdef {
    private List<CategoryService> result;
    private ServiceServify service;

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

    @Given("A specific service")
    public void a_specific_service() {
        service = CategoryManager.createService("Plomeria");
    }

    @When("calificate a specific service")
    public void calificate_a_specific_service() throws WrongValueError {

        Calification calificacion = new Calification(5);
        service.addCalification(calificacion);

    }

    @Then("a calification is added to that service califications")
    public void a_calification_is_added_to_that_service_califications() {
        assertFalse(service.getCalifications().isEmpty());
        assertEquals(service.getCalifications().get(0).getCalificationValue(), 5,0);
    }
}
