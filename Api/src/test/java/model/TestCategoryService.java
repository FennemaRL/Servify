package model;

import com.Servify.model.CategoryService;
import org.junit.Assert;
import org.junit.Test;

public class TestCategoryService {
    @Test
    public void TestTwoServiceCategoriesAreTheSame() {
        CategoryService ca1 = new CategoryService("Gas Natural");
        CategoryService ca2 = new CategoryService("Gas Natural");
        Assert.assertTrue(ca1.equals(ca2));
    }

    @Test
    public void TestTwoServiceCategoriesArentTheSame() {
        CategoryService ca1 = new CategoryService("Gas Natural");
        CategoryService ca2 = new CategoryService("Plomeria");
        Assert.assertFalse(ca1.equals(ca2));
    }
}
