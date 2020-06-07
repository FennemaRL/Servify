package model;

import com.Servify.model.CategoryManager;
import com.Servify.model.CategoryService;
import com.Servify.model.ServiceServify;
import org.junit.Assert;
import org.junit.Test;

public class ServiceTest {

    @Test
    public void Test2ServicesHasTheSameCategory() {
        CategoryService mcat = CategoryManager.getCategory("Plomeria");
        ServiceServify serv = new ServiceServify(mcat);

        Assert.assertTrue(serv.sameCategory(serv));
    }
}
