package com.myadvisor.myadvisor.repository;

import com.myadvisor.myadvisor.model.Message;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MessageRepository extends JpaRepository<Message, Long> {
}
