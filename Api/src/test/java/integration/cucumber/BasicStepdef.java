package integration.cucumber;


import io.cucumber.java.en.Given;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.When;

import static org.junit.Assert.assertTrue;

public class BasicStepdef {
    private KeyboardNotBroke akeyboard;

    @Given("^A keyboard$")
    public void aKeyboard() {
        akeyboard = new KeyboardNotBroke();
    }

    @When("^I small the keyboard \"([^\"]*)\" time$")
    public void iSmallTheKeyboardTime(String punchs) throws Throwable {
        Integer npunches = Integer. parseInt(punchs);
        akeyboard.giveNpunches(npunches);
    }

    @Then("^The keyboard is broke$")
    public void theKeyboardIsBroke() {
        System.out.println(akeyboard.isBroke());
        assertTrue(akeyboard.isBroke());
    }
}
