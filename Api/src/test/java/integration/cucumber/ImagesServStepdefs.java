package integration.cucumber;

import com.Servify.model.*;
import io.cucumber.java.en.And;
import io.cucumber.java.en.Given;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.When;
import org.junit.Assert;

public class ImagesServStepdefs {
    private ServiceProviderServify provider;
    private ServiceServify serviceSelected;
    private String ressError;

    @Given("A serviceProvider {string} with {string} as a service")
    public void aServiceProviderWithAsAService(String prov, String servname) {
        provider = new ServiceProviderServify(prov);
        provider.addService(CategoryManager.createService(servname));
    }

    @When("Select the service {string} of {string}")
    public void selectTheServiceOf(String service, String provName) {
        serviceSelected = provider.getServices().get(0);

    }

    @Then("I see nothing")
    public void iSeeNothing() {
        Assert.assertTrue(serviceSelected.getImages().isEmpty());
    }

    @And("I add a image in {string} of {string}")
    public void iAddAImageInOf(String serviceName, String  prov) {
        provider.addImageToService(new ServifyImage("","png",new byte[] { (byte)0xe0}), CategoryManager.getCategory(serviceName));
    }

    @Then("I see a one image")
    public void iSeeAOneImage() {
        Assert.assertEquals(1, serviceSelected.getImages().size());
    }

    @And("I add a image {string} type {string} in {string} of {string}")
    public void iAddAImageTypeInOf(String imagename, String imagetype, String serviceName, String prov) {
        try {
            provider.addImageToService(new ServifyImage(imagename, imagetype, new byte[]{(byte) 0xe0}), CategoryManager.getCategory(serviceName));
        }
        catch (ServiceProviderError e){
            ressError = e.getMessage();
        }
    }

    @And("I delete the image {string} type {string} in {string} of {string}")
    public void iDeleteTheImageTypeInOf(String imagename, String imagetype, String serviceName, String prov) {
        provider.deleteImageToService(imagename,imagetype,CategoryManager.getCategory(serviceName));
    }

    @Then("trow error {string}")
    public void trowError(String errmessage) {
        Assert.assertEquals(errmessage, ressError);
    }
}
