package com.jforce.blog.dto;

import com.jforce.blog.constants.Status;
import lombok.Data;

@Data
public class AppResponse<T> {
   private int statusCode;
   private String status;
   private String message;
   private T data;

   public static final AppResponse SUCCESS =
           new AppResponse(200,Status.SUCCESS.name(), "Request Processed Successfully.");

   public static final AppResponse FAILED =
           new AppResponse(500, Status.FAILED.name(), "Error Occurred while processing request.");


    public AppResponse(String status, String message) {
        this.status= status;
        this.message= message;
    }

    public AppResponse(int statusCode, String status, String message){
        this.statusCode=statusCode;
        this.status=status;
        this.message = message;
    }

    public AppResponse(int statusCode, String message){
        this.statusCode=statusCode;
        this.message=message;
    }

    public AppResponse(String status, String message, T data){
        this.message=message;
        this.status= status;
        this.data = data;
    }

    public static <T> AppResponse<T> withData(AppResponse response, T data){

        System.out.println("creating response");
         return new AppResponse(response.status, response.message, data);

    }

    public static <T> AppResponse<T> error(int value, String status ,String message) {
        return new AppResponse(value,status, message);
    }
}
