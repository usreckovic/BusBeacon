package rs.ac.busbeacon.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import rs.ac.busbeacon.entity.RouteStation;

import java.util.List;

public interface RouteStationRepository extends JpaRepository<RouteStation, Integer> {

    List<RouteStation> findByRouteRouteIdOrderByStationOrderAsc(Integer routeId);

    @Modifying
    @Query("DELETE FROM route_station rs WHERE rs.route.routeId = :routeId")
    void deleteByRouteId(@Param("routeId") Integer routeId);

    @Query("SELECT rs.route.routeId FROM route_station rs WHERE rs.station.stationId IN (:s1, :s2) GROUP BY rs.route.routeId HAVING COUNT(DISTINCT rs.station.stationId) = 2")
    Integer findRouteIdByStations(@Param("s1") Integer stationId1, @Param("s2") Integer stationId2);
}