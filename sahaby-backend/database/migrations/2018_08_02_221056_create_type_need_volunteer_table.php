<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTypeNeedVolunteerTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('type_need_volunteer', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('type_need_id')->unsigned()->nullable()->default(null);
            $table->foreign('type_need_id')
                  ->references('id')
                  ->on('type_needs')
                  ->onDelete('cascade');
            $table->integer('volunteer_id')->unsigned()->nullable()->default(null);
            $table->foreign('volunteer_id')
                  ->references('id')
                  ->on('volunteers')
                  ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('type_need_volunteer');
    }
}
