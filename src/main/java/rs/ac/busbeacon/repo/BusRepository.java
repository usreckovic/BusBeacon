package rs.ac.busbeacon.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import rs.ac.busbeacon.entity.Bus;

import java.util.List;
import java.util.Optional;

@Repository
public interface BusRepository extends JpaRepository<Bus, Integer> {

    List<Bus> findAllByDeletedAtIsNull();

    Optional<Bus> findOneByBusIdAndDeletedAtIsNull(Integer id);
}
