package model;

import com.Servify.model.*;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;

import static org.mockito.Mockito.*;

public class ServiceProviderServifyTest {
    private ServiceProviderServify sp;
    private ServiceServify mservice;
    private CategoryService mcs;

    @Before
    public void setUp() {
        mservice = mock(ServiceServify.class);
        sp = new ServiceProviderServify("");
        mcs = mock(CategoryService.class);
    }

    @Test(expected = ServiceProvideError.class)
    public void addAServiceRepeated() throws ServiceProvideError {

        when(mservice.sameCategory(mservice)).thenReturn(true);


        sp.addService(mservice);
        sp.addService(mservice);

    }

    @Test
    public void removeAService() throws ServiceProvideError {
        when(mservice.sameCategory(mcs)).thenReturn(true);
        when(mservice.sameCategory(mservice)).thenReturn(true);
        ServiceProviderServify sp = new ServiceProviderServify("");
        sp.addService(mservice);
        sp.remove(mcs);

        Assert.assertFalse(sp.providesService(mservice));
    }

    @Test
    public void removeANonExistentService() {
        sp.remove(mcs);
    }

    @Test
    public void addADescriptionToAnExistentService() {
        when(mservice.sameCategory(mcs)).thenReturn(true);
        try {
            sp.addService(mservice);
        } finally {
            sp.setServiceWithDescription(mcs, "tetera");
        }
        verify(mservice, atLeastOnce()).setDescription("tetera");
    }

    @Test(expected = EmptyDescriptionError.class)
    public void addAEmptyDescriptionToAnExistentService() {
        when(mservice.sameCategory(mcs)).thenReturn(true);
        ServiceProviderServify sp = new ServiceProviderServify("");
        try {
            sp.addService(mservice);
        } finally {
            sp.setServiceWithDescription(mcs, "");
        }
        verify(mservice, atLeast(0)).setDescription("");
    }

    @Test(expected = ServiceProvideError.class)
    public void addADescriptionToAnonExistentService() {
        when(mservice.sameCategory(mcs)).thenReturn(false);
        ServiceProviderServify sp = new ServiceProviderServify("");
        try {
            sp.addService(mservice);
        } finally {
            sp.setServiceWithDescription(mcs, "te");
        }
        verify(mservice, atLeast(0)).setDescription("te");
    }
}
