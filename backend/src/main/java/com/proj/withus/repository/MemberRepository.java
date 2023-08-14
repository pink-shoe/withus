package com.proj.withus.repository;

import com.proj.withus.domain.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MemberRepository extends JpaRepository<Member, Long> {

    public Optional<Member> findByEmail(String email);

    @Modifying
    @Query("update Member m set m.nickname = :nickname where m.id = :id")
    int updateNickname(@Param("id") Long id, @Param("nickname") String nickname);

}
