package com.gogo.gogo.exception;


import com.gogo.gogo.model.dto.ExceptionMessage;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import java.io.IOException;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class GeneralExceptionHandler extends ResponseEntityExceptionHandler {

    @Override
    protected ResponseEntity<Object> handleMethodArgumentNotValid(MethodArgumentNotValidException ex,
                                                                  HttpHeaders headers,
                                                                  HttpStatus status,
                                                                  WebRequest request) {


        Map<String,String> errors =new HashMap<>();
        ex.getBindingResult().getAllErrors().forEach(error -> {
            String fieldName = ((FieldError) error).getField();
            String errorMessage = error.getDefaultMessage();
            errors.put(fieldName, errorMessage);
        });

        return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);
    }



    @ExceptionHandler(CarNotFoundException.class)
    public ResponseEntity<?> carNotFoundException(CarNotFoundException exception) throws IOException{

        return new ResponseEntity<>(ExceptionMessage.builder()
                .error(HttpStatus.NOT_FOUND.name())
                .status(HttpStatus.NOT_FOUND.value())
                .message(exception.getMessage())
                .timestamp(new Date())
                .build(),HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(ReservationNotFoundException.class)
    public ResponseEntity<?> reservationNotFoundException(ReservationNotFoundException exception) throws IOException{

        return new ResponseEntity<>(ExceptionMessage.builder()
                .error(HttpStatus.NOT_FOUND.name())
                .status(HttpStatus.NOT_FOUND.value())
                .message(exception.getMessage())
                .timestamp(new Date())
                .build(),HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(ExistAccountException.class)
    public ResponseEntity<?> existAccountException(ExistAccountException exception) throws IOException{

        return new ResponseEntity<>(ExceptionMessage.builder()
                .error(HttpStatus.BAD_REQUEST.name())
                .status(HttpStatus.BAD_REQUEST.value())
                .message(exception.getMessage())
                .timestamp(new Date())
                .build(),HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(ExistReservationExeption.class)
    public ResponseEntity<?> existReservationExeption(ExistReservationExeption exception) throws IOException{

        return new ResponseEntity<>(ExceptionMessage.builder()
                .error(HttpStatus.BAD_REQUEST.name())
                .status(HttpStatus.BAD_REQUEST.value())
                .message(exception.getMessage())
                .timestamp(new Date())
                .build(),HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(InvalidLoginException.class)
    public ResponseEntity<?> invalidLoginException(InvalidLoginException exception) throws IOException{

        return new ResponseEntity<>(ExceptionMessage.builder()
                .error(HttpStatus.BAD_REQUEST.name())
                .status(HttpStatus.BAD_REQUEST.value())
                .message(exception.getMessage())
                .timestamp(new Date())
                .build(),HttpStatus.BAD_REQUEST);
    }






}
