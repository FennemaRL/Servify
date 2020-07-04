package com.Servify.model;

import lombok.Data;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;
@Data
@Entity
public class ServiceServify {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(nullable = false)
    private Long id;
    @OneToOne(cascade = CascadeType.ALL)
    private CategoryService category;
    @OneToMany(cascade = CascadeType.ALL)
    private List<Calification> califications;
    @Column
    private String description;
    @ManyToMany(cascade = CascadeType.ALL)
    private List<ScopeService> scopeAreas;
    @OneToMany(cascade = CascadeType.ALL)
    private List<ServiceQuestion> questions;
    @OneToMany(cascade = CascadeType.ALL)
    private List<ServifyImage> images;

    public ServiceServify() {
    }

    public ServiceServify(CategoryService category) {

        this.category = category;
        this.califications = new ArrayList<Calification>();
        this.scopeAreas = new ArrayList<ScopeService>();
        this.califications = new ArrayList<>();
        this.questions = new ArrayList<>();
        this.images = new ArrayList<>();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Boolean hasCategory(String category) {
        return this.category.getCategory().equals(category);
    }

    public Boolean hasScope(String receivedScope) {
        return this.scopeAreas.stream().anyMatch(scope -> scope.getScope().equals(receivedScope));
    }

    public CategoryService getCategory() {
        return category;
    }

    public void setCategory(CategoryService category) {
        this.category = category;
    }

    public Boolean sameCategory(ServiceServify serv) {
        return serv.sameCategory(this.category);
    }

    public Boolean sameCategory(CategoryService categoryService) {
        return this.category.equals(categoryService);
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void addCalification(Calification calificacion) {
        this.califications.add(calificacion);
    }

    public List<Calification> getCalifications() {
        return this.califications;
    }

    public List<ScopeService> getScopes() { return this.scopeAreas;}

    public void setScope(List scope) { this.scopeAreas = scope;}

    public Boolean hasCalifications() {
        return !califications.isEmpty();
    }

    public Double getCalificationAverage() {
        return califications.stream().mapToInt(Calification::getCalificationValue).average()
                .orElse(0d);
    }

    public List<ServiceQuestion> getQuestions() {
        return questions;
    }

    public void addQuestion(ServiceQuestion sq) {
        questions.add(sq);
    }

    public void addResponseToQuestion(String response, String question) throws InvalidQuestion {
        List<ServiceQuestion> questionsfind = questions.stream().filter(serviceQuestion -> serviceQuestion.getQuestion().equals(question) ).collect(Collectors.toList());
        if(questionsfind.isEmpty()){
            throw new InvalidQuestion("El servicio "+category.getCategory() +" no tiene la pregunta "+question);
        }
        questionsfind.get(0).addAnswer(response);
    }

    public List<ServifyImage> getImages() {
        return images;
    }

    public void addImage(ServifyImage image) {
        if(!images.stream().filter(servifyImage -> servifyImage.sameNameAndType(image.getName(),image.getType()) ).collect(Collectors.toList()).isEmpty()){
           throw new ServiceProviderError("Error : no pueden haber 2 imagenes con el mismo nombre y tipo");
        }
        images.add(image);
    }

    public void removeImage(String imageName, String imageType) {
       images.removeIf(servifyImage -> servifyImage.sameNameAndType(imageName,imageType));
    }
}
