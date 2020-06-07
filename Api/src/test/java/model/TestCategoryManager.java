package model;

import com.Servify.model.CategoryManager;
import com.Servify.model.NoExistentCategorieError;
import com.Servify.model.ServiceL;
import org.junit.Test;

public class TestCategoryManager {
    @Test
    public void testcreateServiceOfAnExistentCategorie(){
        ServiceL serv = null;
        try {
            serv = CategoryManager.createService("Plomeria");
        } catch (NoExistentCategorieError catError) {
        } finally {
            assert serv != null;
        }
    }
    @Test(expected = NoExistentCategorieError.class)
    public void testcreateServiceOfAnNoExistentCategorie() throws NoExistentCategorieError {
        ServiceL serv = CategoryManager.createService("Mineria");
    }
}
