package rs.ac.busbeacon.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import rs.ac.busbeacon.entity.Station;

import java.util.List;
import java.util.Optional;

@Repository
public interface StationRepository extends JpaRepository<Station, Integer> {

    List<Station> findAllByDeletedAtIsNull();

    Optional<Station> findOneByStationIdAndDeletedAtIsNull(Integer id);
}
