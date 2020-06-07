package model;

import com.Servify.model.CategoryService;
import com.Servify.model.ServiceL;
import com.Servify.model.ServiceProvideError;
import com.Servify.model.ServiceProviderServify;
import org.junit.Assert;
import org.junit.Test;

import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

public class ServiceProviderServifyTest {
    private ServiceProviderServify sp;

    @Test(expected = ServiceProvideError.class)
    public void addAServiceRepeated() throws ServiceProvideError {
        ServiceL mservice = mock(ServiceL.class);
        when(mservice.sameCategory(mservice)).thenReturn(true);
        ServiceProviderServify sp = new ServiceProviderServify("");

        sp.addService(mservice);
        sp.addService(mservice);

    }
    @Test
    public void removeAService() throws ServiceProvideError {
        ServiceL mservice = mock(ServiceL.class);
        CategoryService mcs = mock(CategoryService.class);
        when(mservice.sameCategory(mcs)).thenReturn(true);
        when(mservice.sameCategory(mservice)).thenReturn(true);
        ServiceProviderServify sp = new ServiceProviderServify("");
        sp.addService(mservice);
        sp.remove(mcs);

        Assert.assertFalse(sp.providesService(mservice));
    }
    @Test
    public void removeANonExistentService(){
        CategoryService mcs = mock(CategoryService.class);
        ServiceProviderServify sp = new ServiceProviderServify("");

        sp.remove(mcs);

    }
}
