package com.Servify.model;

import lombok.Data;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Entity
@Data
public class ServiceProviderServify {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(nullable = false)
    private Long id;
    @Column(unique = true)
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
    @Column
    private String password;
    @Column
    private Double averageRating = 0d;

    protected ServiceProviderServify() {
    }

    public ServiceProviderServify(String name, String password) {
        this.name = name;
        this.password = password;
        this.offerServices = new ArrayList<>();
    }

    public ServiceProviderServify(String name) {
        this.name = name;
        this.offerServices = new ArrayList<>();
    }

    public ServiceProviderServify(String name, String phoneNmbr, String celNmbr, String webPage, String residence,String password) throws EmptyFieldReceivedError {

        if(name.equals("") || phoneNmbr.equals("") || celNmbr.equals("") || webPage.equals("") || residence.equals("") ||
            password.equals("")){
            throw new EmptyFieldReceivedError("empty field was received");
        }

        this.name = name;
        this.phoneNmbr = phoneNmbr;
        this.celNmbr = celNmbr;
        this.webPage = webPage;
        this.residence = residence;
        this.password = password;
        offerServices = new ArrayList<>();
    }
    public boolean hasServicesWithCategoryAndZone(String category, String scope) {
        return this.offerServices.stream().anyMatch(s -> s.hasCategory(category) && s.hasScope(scope));
    }

    public Boolean hasServicesWithCategory(String category) {
        return this.offerServices.stream().anyMatch(s -> s.hasCategory(category));
    }

    public void addService(ServiceServify ser) throws ServiceProviderError {
        List<ServiceServify> sameServices = offerServices.stream().filter(serv -> serv.sameCategory(ser)).collect(Collectors.toList());
        assertServiceNotProvided(sameServices);
        offerServices.add(ser);
    }

    private void assertServiceNotProvided(List<ServiceServify> sameServices) throws ServiceProviderError {
        if (!sameServices.isEmpty()) {
            throw new ServiceProviderError();
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
        if (description.isEmpty()) throw new EmptyDescriptionError();
        assertServiceIsProvided(services);
        services.get(0).setDescription(description);
    }

    public Calification addNewCalificationToService(CategoryService c, Integer calificationValue, ServiceConsumer consumer, String message) throws WrongValueError {
        List<ServiceServify> services = filterByCategory(c);
        assertServiceIsProvided(services);
        Calification newCalification = new Calification(calificationValue, consumer, message);
        services.get(0).addCalification(newCalification);
        averageRating = getAverageRating();
        return newCalification;
    }

    public Double getAverageRating() {
        return offerServices.stream().mapToDouble(ServiceServify::getCalificationAverage).average()
                .orElse(0d);
    }

    private void assertServiceIsProvided(List<ServiceServify> services) {
        if (services.isEmpty()) throw new ServiceProviderError("Error: Servicio no provisto");
    }

    private List<ServiceServify> filterByCategory(CategoryService c) {
        return offerServices.stream().filter(s -> s.sameCategory(c))
                .collect(Collectors.toList());
    }

    public String getServiceDescription(CategoryService c) {
        return filterByCategory(c).get(0).getDescription();
    }
    public String getPhoneNmbr() { return phoneNmbr; }
    public String getCelNmbr() { return celNmbr; }
    public String getWebPage() { return webPage;}
    public String getResidence() { return residence; }
    public Double getServiceAverage(CategoryService c){
        return filterByCategory(c).get(0).getCalificationAverage();
    }
    public String getName() {
        return name;
    }

    public void setPersonalInformation(String name, String phoneNmbr, String cellNmbr, String webpage, String residence) throws EmptyFieldReceivedError {
        assertAnyFieldsAreEmpty(name, phoneNmbr, cellNmbr, webpage, residence);
        this.name = name;
        this.phoneNmbr = phoneNmbr;
        this.celNmbr = cellNmbr;
        this.webPage = webpage;
        this.residence = residence;
    }

    private void assertAnyFieldsAreEmpty(String name, String phoneNmbr, String cellNmbr, String webpage, String residence) throws EmptyFieldReceivedError {
        if (name.equals("") || phoneNmbr.equals("") || cellNmbr.equals("") || webpage.equals("") || residence.equals("")) {
            throw new EmptyFieldReceivedError("There is an empty missing field");
        }
    }

    public List<ScopeService> getServiceScope(CategoryService category) {
        return filterByCategory(category).get(0).getScopes();
    }

    public void modifyServiceWithScope(CategoryService category, List<ScopeService> scope) {
        List<ServiceServify> services = filterByCategory(category);
        assertServiceIsProvided(services);
        services.get(0).setScope(scope);
    }

    public Boolean canLoginWith( String password) {
        return this.password.equals(password);
    }

    public void changePassword(String password) {
        this.password = password;
    }

    public List<ServiceServify> getServices() {
        return offerServices;
    }

    public void addQuestionToService(CategoryService category, ServiceQuestion sq) {
        ServiceServify s = filterByCategory(category).get(0);
        s.addQuestion(sq);
    }

    public void addAnswerToServiceInQuestion(String response, CategoryService category, String question) throws InvalidQuestion {
        List<ServiceServify> services = filterByCategory(category);
        assertServiceIsProvided(services);
        services.get(0).addResponseToQuestion(response,question);
    }

    public void addImageToService(ServifyImage image, CategoryService category){
        List<ServiceServify> services = filterByCategory(category);
        assertServiceIsProvided(services);
        services.get(0).addImage(image);
    }

    public void deleteImageToService(String imagename, String imagetype, CategoryService category) {
        List<ServiceServify> services = filterByCategory(category);
        assertServiceIsProvided(services);
        services.get(0).removeImage(imagename, imagetype);

    }

    public void addLikeToReview(CategoryService category, Long id) throws InvalidReviewError{
        List<ServiceServify> services = filterByCategory(category);
        assertServiceIsProvided(services);
        services.get(0).addLikeToReview(id);
    }
}
