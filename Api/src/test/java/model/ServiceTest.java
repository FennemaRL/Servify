package model;

import com.Servify.model.CategoryService;
import com.Servify.model.ServiceL;
import org.junit.Assert;
import org.junit.Test;
import org.mockito.Mockito;

import static org.mockito.Mockito.*;

public class ServiceTest {

    @Test
    public void Test2ServicesHasTheSameCategory(){
        CategoryService mcat = mock(CategoryService.class);
        ServiceL serv = new ServiceL(mcat);
        serv.sameCategory(serv);

        verify(mcat,atLeastOnce()).equals(mcat);
    }
}
