package model;

import com.Servify.model.CategoryManager;
import com.Servify.model.NoExistentCategoryError;
import com.Servify.model.ServiceServify;
import org.junit.Test;

public class TestCategoryManager {
    @Test
    public void testCreateServiceOfAnExistentCategory() {
        ServiceServify serv = null;
        try {
            serv = CategoryManager.createService("Plomeria");
        } catch (NoExistentCategoryError ignored) {
        } finally {
            assert serv != null;
        }
    }

    @Test(expected = NoExistentCategoryError.class)
    public void testCreateServiceOfAnNoExistentCategory() throws NoExistentCategoryError {
        ServiceServify serv = CategoryManager.createService("Mineria");
    }
}
