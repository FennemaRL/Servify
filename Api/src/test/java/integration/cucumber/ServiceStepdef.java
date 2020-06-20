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
    private ServiceProviderServify provider;
    private Double average;

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

    @Given("a service {string} of {string} serviceProvider")
    public void a_service_of_serviceProvider(String string, String string2) {
        provider = new ServiceProviderServify(string2);
        service = CategoryManager.createService(string);

        provider.addService(service);
    }

    @When("i ask the average calification of a service that hasn't got any calification")
    public void i_ask_the_average_calification_of_a_service_that_hasn_t_got_any_calification() {
        average = service.getCalificationAverage();
    }

    @Then("cero is returned")
    public void cero_is_returned() {
        assertTrue(service.getCalifications().isEmpty());
        assertEquals(average, 0,0);
    }

    @When("i ask the average calification of a service with some calification")
    public void i_ask_the_average_calification_of_a_service_with_some_calification() throws WrongValueError {
        Calification calif1 = new Calification(5);
        Calification calif2 = new Calification(5);
        Calification calif3 = new Calification(5);

        service.addCalification(calif1);
        service.addCalification(calif2);
        service.addCalification(calif3);

        average = service.getCalificationAverage();
    }

    @Then("the average is returned")
    public void the_average_is_returned() {
        assertFalse(service.getCalifications().isEmpty());
        assertEquals(average, 5,0);
    }
}
