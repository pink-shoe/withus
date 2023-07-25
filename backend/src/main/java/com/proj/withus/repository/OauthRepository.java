package com.proj.withus.repository;

import com.proj.withus.domain.Member;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;

@Repository
@RequiredArgsConstructor
public class OauthRepository {

    private final EntityManager em;

    public void save(Member member) {
        em.persist(member);
    }
}
