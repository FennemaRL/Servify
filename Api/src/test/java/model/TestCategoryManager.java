package model;

import com.Servify.model.CategoryManager;
import com.Servify.model.NoExistentCategorieError;
import com.Servify.model.ServiceServify;
import org.junit.Test;

public class TestCategoryManager {
    @Test
    public void testcreateServiceOfAnExistentCategorie() {
        ServiceServify serv = null;
        try {
            serv = CategoryManager.createService("Plomeria");
        } catch (NoExistentCategorieError catError) {
        } finally {
            assert serv != null;
        }
    }

    @Test(expected = NoExistentCategorieError.class)
    public void testcreateServiceOfAnNoExistentCategorie() throws NoExistentCategorieError {
        ServiceServify serv = CategoryManager.createService("Mineria");
    }
}
