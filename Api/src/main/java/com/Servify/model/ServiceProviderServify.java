package com.Servify.model;

import lombok.Data;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Entity
@Data
public class ServiceProviderServify {

    public static final String SERVICIO_YA_PROVISTO = "Error: Servicio ya provisto";
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(nullable = false)
    private Long id;
    @Column
    private String name;
    @Column
    private String phoneNmbr;
    @Column
    private String celNmbr;
    @Column
    private String webPage;
    @Column
    private String residence;
    @OneToMany(cascade = CascadeType.ALL)
    private List<ServiceServify> offerServices;

    protected ServiceProviderServify() {
    }

    public ServiceProviderServify(String name){
        this.name = name;
        this.offerServices = new ArrayList<ServiceServify>();
    }
    public ServiceProviderServify(String name,String phoneNmbr, String celNmbr, String webPage, String residence) {
        this.name = name;
        this.phoneNmbr = phoneNmbr;
        this.celNmbr = celNmbr;
        this. webPage = webPage;
        this.residence = residence;
        offerServices = new ArrayList<ServiceServify>();
    }

    public Boolean hasServicesWithCategory(String category) {
        return this.offerServices.stream().anyMatch(s -> s.hasCategory(category));
    }

    public void addService(ServiceServify ser) throws ServiceProvideError {
        List<ServiceServify> sameServices = offerServices.stream().filter(serv -> serv.sameCategory(ser)).collect(Collectors.toList());
        assertServiceNotProvided(sameServices);
        offerServices.add(ser);
    }

    private void assertServiceNotProvided(List<ServiceServify> sameServices) throws ServiceProvideError {
        if (!sameServices.isEmpty()) {
            throw new ServiceProvideError(SERVICIO_YA_PROVISTO);
        }
    }

    public Boolean providesService(ServiceServify ser) {
        return offerServices.stream().filter(serv -> serv.sameCategory(ser)).count() == 1;
    }

    public void remove(CategoryService sc) {
        offerServices = offerServices.stream().filter(serv -> !serv.sameCategory(sc)).collect(Collectors.toList());
    }

    public Boolean providesService(CategoryService cs) {
        return filterByCategory(cs).size() == 1;
    }

    public void setServiceWithDescription(CategoryService c, String description) {
        List<ServiceServify> services = filterByCategory(c);
        if (services.isEmpty()) throw new EmptyDescriptionError();
        services.get(0).setDescription(description);
    }

    private List<ServiceServify> filterByCategory(CategoryService c) {
        return offerServices.stream().filter(s -> s.sameCategory(c))
                .collect(Collectors.toList());
    }

    public String getServiceDescription(CategoryService c) {
        return filterByCategory(c).get(0).getDescription();
    }


    public String getName() { return name; }
    public String getPhoneNmbr() { return phoneNmbr; }
    public String getCelNmbr() { return celNmbr; }
    public String getWebPage() { return webPage;}
    public String getResidence() { return residence; }

    public void setPersonalInformation(String name, String phoneNmbr, String cellNmbr, String webpage, String residence) throws EmptyFieldReceivedError {

        if(name.equals("")||phoneNmbr.equals("")||cellNmbr.equals("")||webpage.equals("")|| residence.equals("")){

            throw new EmptyFieldReceivedError("There is an empty missing field");
        }else{
            this.name = name;
            this.phoneNmbr = phoneNmbr;
            this.celNmbr = cellNmbr;
            this.webPage = webpage;
            this.residence = residence;
        }
    }
}
