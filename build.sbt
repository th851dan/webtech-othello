name := """webtech-othello"""
organization := "de.htwg.wt"

version := "1.0-SNAPSHOT"

lazy val root = (project in file(".")).enablePlugins(PlayScala)

scalaVersion := "2.13.3"

libraryDependencies ++= Seq[ModuleID](
  guice,
  "org.scalatestplus.play" %% "scalatestplus-play" % "5.0.0" % Test,
  "de.htwg.se" %% "boardmodule" % "1.0",
  "de.htwg.se" %% "othello-in-scala" % "1.0",
  "de.htwg.se" %% "usermodule" % "1.0"
)
