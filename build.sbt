name := """webtech-othello"""
organization := "de.htwg.wt"

version := "1.0-SNAPSHOT"

lazy val OthelloMainModule = ProjectRef(uri("git://github.com/marcothuemmler/de.htwg.se.OthelloInScala.git#master"), "OthelloMainModule")

lazy val root = (project in file("."))
  .enablePlugins(PlayScala)
  .dependsOn(OthelloMainModule)
  .aggregate(OthelloMainModule)
  .disablePlugins(PlayLogback)

scalaVersion := "2.13.3"

libraryDependencies ++= Seq[ModuleID](
  guice,
  "org.scalatestplus.play" %% "scalatestplus-play" % "5.0.0" % Test,
)
