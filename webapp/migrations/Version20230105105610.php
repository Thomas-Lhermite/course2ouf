<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20230105105610 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SEQUENCE team_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE TABLE team (id INT NOT NULL, name TEXT NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE TABLE team_grade (team_id INT NOT NULL, grade_id INT NOT NULL, PRIMARY KEY(team_id, grade_id))');
        $this->addSql('CREATE INDEX IDX_9E5CE774296CD8AE ON team_grade (team_id)');
        $this->addSql('CREATE INDEX IDX_9E5CE774FE19A1A8 ON team_grade (grade_id)');
        $this->addSql('ALTER TABLE team_grade ADD CONSTRAINT FK_9E5CE774296CD8AE FOREIGN KEY (team_id) REFERENCES team (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE team_grade ADD CONSTRAINT FK_9E5CE774FE19A1A8 FOREIGN KEY (grade_id) REFERENCES tbl_grade (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('DROP SEQUENCE team_id_seq CASCADE');
        $this->addSql('ALTER TABLE team_grade DROP CONSTRAINT FK_9E5CE774296CD8AE');
        $this->addSql('ALTER TABLE team_grade DROP CONSTRAINT FK_9E5CE774FE19A1A8');
        $this->addSql('DROP TABLE team');
        $this->addSql('DROP TABLE team_grade');
    }
}
