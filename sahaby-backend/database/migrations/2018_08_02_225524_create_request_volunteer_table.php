<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateRequestVolunteerTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('request_volunteer', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('request_id')->unsigned()->nullable()->default(null);
            $table->foreign('request_id')
                  ->references('id')
                  ->on('requests')
                  ->onDelete('cascade');
            $table->integer('volunteer_id')->unsigned()->nullable()->default(null);
            $table->foreign('volunteer_id')
                  ->references('id')
                  ->on('volunteers')
                  ->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('request_volunteer');
    }
}
