package com.Servify.model;

import lombok.Data;

import javax.persistence.*;


@Entity
@Data
public class ServifyImage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String type;
    @Column(length = 1000)
    private byte[] picByte;

    public ServifyImage(){

    }
    public ServifyImage(String name, String type, byte[] picByte) {
        if( type.isEmpty() || ! ("png".contains(type) || "jpg".contains(type))){
            throw new ServiceProviderError("Error : la imagen No puede de ser de otro tipo que png o jpg");
        }
        this.name = name;
        this.type = type;
        this.picByte = picByte;
    }

    public boolean sameNameAndType(String imageName, String imageType) {
        return name.equals(imageName) && type.equals(imageType);
    }

    public String getName() {
        return name;
    }

    public String getType() {
        return type;
    }
}
