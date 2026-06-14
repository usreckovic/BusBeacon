package rs.ac.busbeacon.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import rs.ac.busbeacon.entity.bus;

@Repository
public interface BusRepository extends JpaRepository<bus, Integer> {

}
