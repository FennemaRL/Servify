package integration.cucumber;

import com.Servify.model.*;
import io.cucumber.java.en.And;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.When;
import org.junit.Assert;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

public class RecomendationStepdef {

    private List<ServiceProviderServify> providers = new ArrayList<>();

    @And("There are {int} providers with ratings")
    public void there_are_providers_with_ratings(Integer integer) {
        ServiceServify service1 = CategoryManager.createService("Electricidad");
        ServiceServify service2 = CategoryManager.createService("Electricidad");
        ServiceServify service3 = CategoryManager.createService("Electricidad");
        ServiceServify service4 = CategoryManager.createService("Electricidad");
        ServiceServify service5 = CategoryManager.createService("Electricidad");
        ServiceServify service6 = CategoryManager.createService("Electricidad");

        ServiceProviderServify provider1 = new ServiceProviderServify("Lucas");
        ServiceProviderServify provider2 = new ServiceProviderServify("Lucas");
        ServiceProviderServify provider3 = new ServiceProviderServify("Lucas");
        ServiceProviderServify provider4 = new ServiceProviderServify("Lucas");
        ServiceProviderServify provider5 = new ServiceProviderServify("Lucas");
        ServiceProviderServify provider6 = new ServiceProviderServify("Lucas");

        provider1.addService(service1);
        provider2.addService(service2);
        provider3.addService(service3);
        provider4.addService(service4);
        provider5.addService(service5);
        provider6.addService(service6);

        providers.add(provider1);
        providers.add(provider2);
        providers.add(provider3);
        providers.add(provider4);
        providers.add(provider5);
        providers.add(provider6);

        providers.forEach(p -> {
            CategoryService category = CategoryManager.getCategory("Electricidad");
            try {
                p.addNewCalificationToService(category, 5);
            } catch (WrongValueError wrongValueError) {
                wrongValueError.printStackTrace();
            }
        });
    }

    @When("I want to see the first {int} providers with the best global rating")
    public void i_want_to_see_the_first_providers_with_the_best_global_rating(Integer limit) {
        if (!providers.isEmpty()) {
            providers = providers.stream().sorted((e1, e2) -> e2.getAverageRating().compareTo(e1.getAverageRating()))
                    .collect(Collectors.toList()).subList(0, 5);
        }
    }

    @Then("I see the first {int} providers with the best global rating")
    public void i_see_the_first_providers_with_the_best_global_rating(Integer size) {
        Assert.assertEquals(size, (Integer) providers.size());
    }

    @Then("I see no one")
    public void iSeeNoOne() {
        Assert.assertEquals(0, providers.size());
    }

    @And("There are {int} providers with ratings and the first one is {string} the second {string} the third {string}, the fourth {string}, the fifth {string}")


    public void thereAreProvidersWithRatingsAndTheFirstOneIsTheSecondTheThirdTheFourthTheFifth(int limit, String p1, String p2,
                                                                                               String p3, String p4, String p5) throws WrongValueError {
        ServiceServify service1 = CategoryManager.createService("Electricidad");
        ServiceServify service2 = CategoryManager.createService("Electricidad");
        ServiceServify service3 = CategoryManager.createService("Electricidad");
        ServiceServify service4 = CategoryManager.createService("Electricidad");
        ServiceServify service5 = CategoryManager.createService("Electricidad");
        ServiceServify service6 = CategoryManager.createService("Electricidad");

        ServiceProviderServify provider1 = new ServiceProviderServify(p1);
        ServiceProviderServify provider2 = new ServiceProviderServify(p2);
        ServiceProviderServify provider3 = new ServiceProviderServify(p3);
        ServiceProviderServify provider4 = new ServiceProviderServify(p4);
        ServiceProviderServify provider5 = new ServiceProviderServify(p5);
        ServiceProviderServify provider6 = new ServiceProviderServify("WWW");

        provider1.addService(service1);
        provider2.addService(service2);
        provider3.addService(service3);
        provider4.addService(service4);
        provider5.addService(service5);
        provider6.addService(service6);

        providers.add(provider3);
        providers.add(provider4);
        providers.add(provider5);
        providers.add(provider6);
        providers.add(provider1);
        providers.add(provider2);

        CategoryService category = CategoryManager.getCategory("Electricidad");
        provider1.addNewCalificationToService(category, 5);
        provider2.addNewCalificationToService(category, 4);
        provider3.addNewCalificationToService(category, 3);
        provider4.addNewCalificationToService(category, 2);
        provider5.addNewCalificationToService(category, 1);

    }

    @Then("I see providers {string}, {string}, {string}, {string}, {string}")
    public void iSeeProviders(String p1, String p2, String p3, String p4, String p5) {

        Assert.assertEquals(p1, providers.get(0).getName());
        Assert.assertEquals(p2, providers.get(1).getName());
        Assert.assertEquals(p3, providers.get(2).getName());
        Assert.assertEquals(p4, providers.get(3).getName());
        Assert.assertEquals(p5, providers.get(4).getName());
    }
}
