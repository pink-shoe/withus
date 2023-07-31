package com.proj.withus.repository;

import com.proj.withus.domain.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface MemberRepository extends JpaRepository<Member, Long> {

    public Member findByEmail(String email);

    @Query("update Member m set m.nickname = :nickname where m.id = :id")
    int updateNickname(Long id, String nickname);
}
